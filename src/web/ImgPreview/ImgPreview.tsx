// tslint: disable
import React, { Fragment, useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import './ImgPreview.less';

interface ImgPreviewProps {
  visible?: boolean;
  imgSrc?: string;
  maskBgColor?: string;
  onTap?: (type: string) => void;
  multiple?: number
}

const getTime: () => number = () => new Date().getTime();
const abs: (n: number) => number = (n) => Math.abs(n);
const prefixCls = 'mido-imgPreview';

const ImgPreview: React.FC<ImgPreviewProps> = (props) => {
	const { visible, imgSrc, onTap, multiple } = props;

	// 初始化图片信息
	const initImgInfo: {
    src: string;
    width: number;
    height: number;
    scale?: { x: number, y: number },
    translate?: { x: number, y: number, z?: number }
    transition?: string
    offset?: { x: number, y: number }
  } = {
  	src: '',
  	width: 0,
  	height: 0,
  	scale: {
  		x: 1,
  		y: 1
  	},
  	translate: {
  		x: 0,
  		y: 0
  	},
  	transition: 'width 0.6s, height 0.6s',
  	offset: {
  		x: 0,
  		y: 0
  	}
  };

	// 父容器
	const container: React.MutableRefObject<any> = useRef(null);
	// 图片容器
	const imgContainer: React.MutableRefObject<any> = useRef(null);
	// 设置图片信息
	const [imgInfo, setImgInfo] = useState(initImgInfo);

	useEffect(() => {
		if (!visible) return;
		// 获取图片宽高
		const img: HTMLImageElement = new Image();
		img.src = imgSrc;

		img.onload = () => {
			setImgInfo({
				...imgInfo,
				width: img.width,
				height: img.height,
				src: imgSrc,
			});
		};
	}, [visible, imgSrc]);

	// 是否已经放大
	const [large, setLarge] = useState(false);

	// 第一个触摸点
	let start: any = [];
	// 开始点击位置
	let startPosition: { x: number; y: number } = {
		x: 0,
		y: 0
	};
	// 当前时间，两次触发时间差
	let startTime: number = 0;
	let delta: number = 0;
	// 单击
	let oneTapTimeout: ReturnType<typeof setTimeout> = null;
	// 长按
	let longTapTimeout: ReturnType<typeof setTimeout> = null;
	// 存储移动值
	let move: any = [];
	// 单击是否移动
	let isTouchMove: boolean = false;

	// 重置
	const resetData = () => {
		// 还原图片设置
		setImgInfo(initImgInfo);
		// 还原放大标识
		setLarge(false);
		// 清除触摸点
		start = [];
		startPosition = {
			x: 0,
			y: 0
		};
	};

	const getTouchs = (e: React.TouchEvent) => {
		const rect = container.current.getBoundingClientRect();
		return Array.from(e.touches).map(touch => ({
			x: touch.pageX - rect.top,
			y: touch.pageY - rect.left
		}));
	};

	/**
   * 图片单击
   * 关闭图片预览
   */
	const handleOnTap = (t: string) => {
		resetData();
		onTap(t);
	};

	/**
   * 图片双击
   * 放大||缩小图片
   */
	const handleDoubleOnTap = ({ x = 0, y = 0 }: { x: number, y: number }) => {
		if (!large) {
			setLarge(true);
			setImgInfo({
				...imgInfo,
				scale: {
					x: multiple,
					y: multiple
				},
				transition: '0.3s',
				translate: {
					x: -x / multiple,
					y: - y / multiple
				}
			});
		} else {
			setLarge(false);
			setImgInfo({
				...imgInfo,
				scale: {
					x: 1,
					y: 1
				},
				translate: {
					x: 0,
					y: 0
				}
			});
		}
		onTap('doubleTap');
	};

	/**
   * touchStart
   */
	const handleTouchStart = (e: React.TouchEvent) => {
		start = e.touches;
		// 多点触控
		if (start.length > 1) {
			console.log(11);
		} else {
			// 第一个触摸点赋值
			startPosition = {
				x: start[0].pageX,
				y: start[0].pageY,
			};

			delta = getTime() - startTime;
			startTime = getTime();

			// 双击事件
			if (delta > 0 && delta <= 300) {
				const t = getTouchs(e)[0];
				// 双击事件，放大||缩小图片
				handleDoubleOnTap({
					x: t.x,
					y: t.y
				});
				// 清除长按
				clearTimeout(longTapTimeout);
				// 清除单击
				clearTimeout(oneTapTimeout);
			} else {
				// 长按事件
				longTapTimeout = setTimeout(() => {
					onTap('longTap');
				}, 800);
			}
		}
	};

	/**
   * touchMove
   */
	const handleTouchMove = (e: React.TouchEvent) => {
		move = e.touches;

		// 多点触控
		if (e.touches.length > 1) {
			console.log(e.touches);
		}

		// 当拖动大于3，取消长按监听
		if (~~abs(move[0].pageX - startPosition.x) > 3 ||
      ~~abs(move[0].pageY - startPosition.y) > 3) {
			// 清除长按
			clearTimeout(longTapTimeout);
			// 清除单击
			isTouchMove = true;
		}
	};

	/**
   * touchEnd
   */
	const handleTouchEnd = () => {
		// 清除长按
		clearTimeout(longTapTimeout);

		const timestamp = getTime();

		oneTapTimeout = setTimeout(() => {
			if (timestamp - startTime < 300 && !isTouchMove) {
				// 触发单击事件
				handleOnTap('oneTap');
			} else {
				clearTimeout(oneTapTimeout);
				isTouchMove = false;
			}
		}, 500);
	};

	/**
   * touchCancel
   */
	const hadleTouchCancel = () => {
		handleTouchEnd();
	};

	return (
		<Fragment>
			<div
				className={classnames(
					{
						[`${prefixCls}-wrap`]: visible,
					},
				)}
				ref={container}
			>
				<div
					className={classnames([
						{
							[`${prefixCls}-wrap-content`]: true,
							[`${prefixCls}-wrap-content-active`]: visible,
						},
					])}
					style={{
						width: imgInfo.width,
						height: imgInfo.height,
						backgroundImage: `url(${imgInfo.src})`,
						transformOrigin: '0% 0%',
						// eslint-disable-next-line
						transform: `scale(${imgInfo.scale.x}, ${imgInfo.scale.y}) translate(${imgInfo.translate.x}px, ${imgInfo.translate.y}px)`,
						transition: `${imgInfo.transition}`
					}}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					onTouchCancel={hadleTouchCancel}
					ref={imgContainer}
				/>
			</div>
		</Fragment>
	);
};

ImgPreview.defaultProps = {
	visible: false,
	imgSrc: '',
	onTap: () => { },
	multiple: 2
};

export default ImgPreview;