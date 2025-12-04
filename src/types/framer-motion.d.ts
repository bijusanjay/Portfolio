import 'framer-motion';

declare module 'framer-motion' {
  import { HTMLMotionProps } from 'framer-motion';
  
  // Augment motion components to accept children
  export interface MotionProps extends HTMLMotionProps<any> {
    children?: React.ReactNode;
  }
}

