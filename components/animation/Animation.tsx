'use client';
import React from 'react'
import { motion }  from 'framer-motion';

const Animation = ({text,className, style, animationVertix}: {animationVertix: 'x'| 'y'; text: string; className?:string; style?:object}) => {
  return (
    <div>

    <motion.h1
  className={className}
  style={style}
    initial={{ opacity: 0, x: (animationVertix == 'x'? "-100%": '0'), y:(animationVertix === 'y'? 100: 0) }}
    whileInView={{ opacity: 1, x: 0 , y:0}}
    transition={{ duration: 0.9, delay: 0.4 , ease:"linear" }}
    
    >
    {text}
  </motion.h1>
      </div>
  )
}

export default Animation