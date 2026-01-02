declare module "react-responsive-carousel" {
  import { Component } from "react";

  export interface CarouselProps {
    showArrows?: boolean;
    showStatus?: boolean;
    showIndicators?: boolean;
    showThumbs?: boolean;
    infiniteLoop?: boolean;
    selectedItem?: number;
    axis?: "horizontal" | "vertical";
    verticalSwipe?: "natural" | "standard";
    onChange?: (index: number, item: React.ReactNode) => void;
    onClickItem?: (index: number, item: React.ReactNode) => void;
    onClickThumb?: (index: number, item: React.ReactNode) => void;
    width?: string | number;
    useKeyboardArrows?: boolean;
    autoPlay?: boolean;
    stopOnHover?: boolean;
    interval?: number;
    transitionTime?: number;
    swipeScrollTolerance?: number;
    dynamicHeight?: boolean;
    emulateTouch?: boolean;
    statusFormatter?: (current: number, total: number) => string;
    centerMode?: boolean;
    centerSlidePercentage?: number;
    labels?: {
      leftArrow?: string;
      rightArrow?: string;
      item?: string;
    };
    children?: React.ReactNode;
    className?: string;
  }

  export class Carousel extends Component<CarouselProps> {}
}
