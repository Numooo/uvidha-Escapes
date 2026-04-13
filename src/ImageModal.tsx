import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onThumbnailClick: (index: number) => void;
}

export function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onPrev,
  onNext,
  onThumbnailClick,
}: ImageModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [constraints, setConstraints] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useLayoutEffect(() => {
    if (isOpen && containerRef.current && constraintsRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const contentWidth = constraintsRef.current.scrollWidth;
      setConstraints({
        left: Math.min(0, -(contentWidth - containerWidth + 32)), // 32 for padding
        right: 0,
      });
    }
  }, [isOpen, images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onPrev, onNext, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-sm"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <div className="text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Main View */}
          <div className="flex-grow min-h-0 relative flex items-center justify-center p-2 sm:p-8">
            <button
              onClick={onPrev}
              className="absolute left-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all backdrop-blur-md opacity-0 sm:opacity-100"
            >
              <ChevronLeft size={32} />
            </button>

            <div className="w-full h-full flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  src={images[currentIndex]}
                  alt={`Image ${currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                />
              </AnimatePresence>
            </div>

            <button
              onClick={onNext}
              className="absolute right-4 z-20 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white transition-all backdrop-blur-md opacity-0 sm:opacity-100"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* Thumbnail Tray */}
          <div className="flex-shrink-0 h-24 sm:h-32 bg-black/40 backdrop-blur-md border-t border-white/10 overflow-hidden">
            <div ref={containerRef} className="h-full mx-auto max-w-5xl px-4 flex items-center overflow-hidden">
              <motion.div 
                ref={constraintsRef}
                drag="x"
                dragConstraints={constraints}
                dragElastic={0.1}
                className="flex items-center gap-4 cursor-grab active:cursor-grabbing"
                style={{ touchAction: "none" }}
              >
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => onThumbnailClick(idx)}
                    className={`relative flex-shrink-0 w-16 sm:w-24 aspect-video rounded-md overflow-hidden transition-all ${
                      currentIndex === idx 
                        ? "ring-2 ring-brand-primary scale-110 z-10 opacity-100" 
                        : "opacity-40 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </button>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
