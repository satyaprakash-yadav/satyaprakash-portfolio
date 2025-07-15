import { LazyMotion, domAnimation } from "framer-motion";

interface Props {
    children: React.ReactNode;
}

export const LazyMotionLayout = ({ children }: Props) => {
    return (
        <LazyMotion features={domAnimation}>
            {children}
        </LazyMotion>
    )
};
