"use client";
import { motion, useReducedMotion } from "framer-motion";
export function Reveal({ children, className, delay = 0 }) {
  const reduce = useReducedMotion();
  return <motion.div className={className} initial={false} whileInView={reduce ? {} : { opacity: [0.3, 1], y: [24, 0] }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, delay }}>{children}</motion.div>;
}
