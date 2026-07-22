"use client";

import { Children, type ReactNode } from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "motion/react";

type AnimatedListProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
};

export function AnimatedList({
  children,
  className,
  ...props
}: AnimatedListProps) {
  const shouldReduceMotion = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <motion.div
      className={className}
      initial="hidden"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.08,
          },
        },
      }}
      viewport={{ once: true, margin: "-80px 0px" }}
      whileInView="visible"
      {...props}
    >
      {items.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
            visible: {
              opacity: 1,
              transition: {
                duration: shouldReduceMotion ? 0 : 0.35,
                ease: "easeOut",
              },
              y: 0,
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
