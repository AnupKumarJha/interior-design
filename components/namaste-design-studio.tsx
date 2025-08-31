"use client";

import * as React from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue, HTMLMotionProps } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { 
  Facebook, 
  Instagram, 
  Linkedin, 
  Moon, 
  Send, 
  Sun, 
  Twitter, 
  ArrowLeft, 
  ArrowRight,
  Home,
  Palette,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Star,
  CheckCircle,
  Sofa,
  Lightbulb,
  Brush
} from "lucide-react";
import { cn } from "../lib/utils";
import { useMotionValue, animate } from "framer-motion";
import { useState, useEffect } from "react";
import useMeasure from "react-use-measure";
import { VariantProps, cva } from "class-variance-authority";

// Types
type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

type InfiniteSliderProps = {
  children: React.ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: 'horizontal' | 'vertical';
  reverse?: boolean;
  className?: string;
  speed?: number;
  speedOnHover?: number;
};

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

interface SectionWithMockupProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  primaryImageSrc: string;
  secondaryImageSrc: string;
  reverseLayout?: boolean;
}

// Infinite Slider Component
function InfiniteSlider({
  children,
  gap = 16,
  duration = 25,
  durationOnHover,
  direction = 'horizontal',
  reverse = false,
  className,
  speed = 40,
  speedOnHover = 20,
}: InfiniteSliderProps) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [ref, { width, height }] = useMeasure();
  const translation = useMotionValue(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [key, setKey] = useState(0);

  useEffect(() => {
    let controls;
    const size = direction === 'horizontal' ? width : height;
    const contentSize = size + gap;
    const from = reverse ? -contentSize / 2 : 0;
    const to = reverse ? 0 : -contentSize / 2;

    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: 'linear',
        duration: currentDuration * Math.abs((translation.get() - to) / contentSize),
        onComplete: () => {
          setIsTransitioning(false);
          setKey((prevKey) => prevKey + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: 'linear',
        duration: currentDuration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
        onRepeat: () => {
          translation.set(from);
        },
      });
    }

    return controls?.stop;
  }, [key, translation, currentDuration, width, height, gap, isTransitioning, direction, reverse]);

  const hoverProps = durationOnHover ? {
    onHoverStart: () => {
      setIsTransitioning(true);
      setCurrentDuration(durationOnHover);
    },
    onHoverEnd: () => {
      setIsTransitioning(true);
      setCurrentDuration(duration);
    },
  } : {};

  return (
    <div className={cn('overflow-hidden', className)}>
      <motion.div
        className='flex w-max'
        style={{
          ...(direction === 'horizontal' ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === 'horizontal' ? 'row' : 'column',
        }}
        ref={ref}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Animated Testimonials Component
const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
  className?: string;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <div className={cn("max-w-sm md:max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-20", className)}>
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index) ? 999 : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-3xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <h3 className="text-2xl font-bold text-foreground">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonials[active].designation}
            </p>
            <motion.p className="text-lg text-muted-foreground mt-8">
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ArrowLeft className="h-5 w-5 text-foreground group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center group/button"
            >
              <ArrowRight className="h-5 w-5 text-foreground group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Bento Grid Components
const bentoGridVariants = cva(
  "relative grid gap-4 [&>*:first-child]:origin-top-right [&>*:nth-child(3)]:origin-bottom-right [&>*:nth-child(4)]:origin-top-right",
  {
    variants: {
      variant: {
        default: `
          grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr]
          [&>*:first-child]:col-span-8 md:[&>*:first-child]:col-span-6 [&>*:first-child]:row-span-3
          [&>*:nth-child(2)]:col-span-2 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:hidden md:[&>*:nth-child(2)]:block
          [&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:hidden md:[&>*:nth-child(3)]:block
          [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:col-span-3
          [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:col-span-3
        `,
        threeCells: `
          grid-cols-2 grid-rows-2
          [&>*:first-child]:col-span-2
        `,
        fourCells: `
          grid-cols-3 grid-rows-2
          [&>*:first-child]:col-span-1
          [&>*:nth-child(2)]:col-span-2
          [&>*:nth-child(3)]:col-span-2
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const ContainerScrollContext = React.createContext<ContainerScrollContextValue | undefined>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error("useContainerScrollContext must be used within a ContainerScroll Component");
  }
  return context;
}

const ContainerScroll = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
  });
  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-screen w-full", className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};

const BentoGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof bentoGridVariants>
>(({ variant, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(bentoGridVariants({ variant }), className)}
      {...props}
    />
  );
});
BentoGrid.displayName = "BentoGrid";

const BentoCell = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext();
    const translate = useTransform(scrollYProgress, [0.1, 0.9], ["-35%", "0%"]);
    const scale = useTransform(scrollYProgress, [0, 0.9], [0.5, 1]);

    return (
      <motion.div
        ref={ref}
        className={className}
        style={{ translate, scale, ...style }}
        {...props}
      />
    );
  }
);
BentoCell.displayName = "BentoCell";

const ContainerScale = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, style, ...props }, ref) => {
    const { scrollYProgress } = useContainerScrollContext();
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const position = useTransform(scrollYProgress, (pos) =>
      pos >= 0.6 ? "absolute" : "fixed"
    );

    return (
      <motion.div
        ref={ref}
        className={cn("left-1/2 top-1/2 size-fit", className)}
        style={{
          translate: "-50% -50%",
          scale,
          position,
          opacity,
          ...style,
        }}
        {...props}
      />
    );
  }
);
ContainerScale.displayName = "ContainerScale";

// Section with Mockup Component
const SectionWithMockup: React.FC<SectionWithMockupProps> = ({
  title,
  description,
  primaryImageSrc,
  secondaryImageSrc,
  reverseLayout = false,
}) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const layoutClasses = reverseLayout
    ? "md:grid-cols-2 md:grid-flow-col-dense"
    : "md:grid-cols-2";

  const textOrderClass = reverseLayout ? "md:col-start-2" : "";
  const imageOrderClass = reverseLayout ? "md:col-start-1" : "";

  return (
    <section className="relative py-24 md:py-48 bg-background overflow-hidden">
      <div className="container max-w-[1220px] w-full px-6 md:px-10 relative z-10 mx-auto">
        <motion.div
          className={`grid grid-cols-1 gap-16 md:gap-8 w-full items-center ${layoutClasses}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className={`flex flex-col items-start gap-4 mt-10 md:mt-0 max-w-[546px] mx-auto md:mx-0 ${textOrderClass}`}
            variants={itemVariants}
          >
            <div className="space-y-2 md:space-y-1">
              <h2 className="text-foreground text-3xl md:text-[40px] font-semibold leading-tight md:leading-[53px]">
                {title}
              </h2>
            </div>
            <p className="text-muted-foreground text-sm md:text-[15px] leading-6">
              {description}
            </p>
          </motion.div>

          <motion.div
            className={`relative mt-10 md:mt-0 mx-auto ${imageOrderClass} w-full max-w-[300px] md:max-w-[471px]`}
            variants={itemVariants}
          >
            <motion.div
              className={`absolute w-[300px] h-[317px] md:w-[472px] md:h-[500px] bg-muted rounded-[32px] z-0`}
              style={{
                top: reverseLayout ? 'auto' : '10%',
                bottom: reverseLayout ? '10%' : 'auto',
                left: reverseLayout ? 'auto' : '-20%',
                right: reverseLayout ? '-20%' : 'auto',
                transform: reverseLayout ? 'translate(0, 0)' : 'translateY(10%)',
                filter: 'blur(2px)'
              }}
              initial={{ y: reverseLayout ? 0 : 0 }}
              whileInView={{ y: reverseLayout ? -20 : -30 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div
                className="relative w-full h-full bg-cover bg-center rounded-[32px]"
                style={{
                  backgroundImage: `url(${secondaryImageSrc})`,
                }}
              />
            </motion.div>

            <motion.div
              className="relative w-full h-[405px] md:h-[637px] bg-card/10 rounded-[32px] backdrop-blur-[15px] backdrop-brightness-[100%] border-0 z-10 overflow-hidden"
              initial={{ y: reverseLayout ? 0 : 0 }}
              whileInView={{ y: reverseLayout ? 20 : 30 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="p-0 h-full">
                <div
                  className="h-full relative"
                  style={{
                    backgroundSize: "100% 100%",
                  }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${primaryImageSrc})`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Namaste Design Studio Component
function NamasteDesignStudio() {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const testimonials = [
    {
      quote: "Namaste Design Studio transformed our home into a sanctuary of peace and beauty. Their attention to detail and understanding of our vision was exceptional.",
      name: "Priya Sharma",
      designation: "Homeowner, Mumbai",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "The team's ability to blend traditional Indian aesthetics with modern functionality is unmatched. Our office space now reflects our company's values perfectly.",
      name: "Rajesh Kumar",
      designation: "CEO, Tech Solutions",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "From concept to completion, Namaste Design Studio exceeded our expectations. Their sustainable design approach aligns perfectly with our environmental values.",
      name: "Anita Desai",
      designation: "Restaurant Owner",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: "Professional, creative, and deeply understanding of Indian design sensibilities. They created a space that truly feels like home.",
      name: "Vikram Singh",
      designation: "Architect",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  const interiorImages = [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=2374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const clientLogos = [
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=2126&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <ContainerScroll className="h-[350vh]">
        <BentoGrid className="sticky left-0 top-0 z-0 h-screen w-full p-4">
          {interiorImages.map((imageUrl, index) => (
            <BentoCell
              key={index}
              className="overflow-hidden rounded-xl shadow-xl"
            >
              <img
                className="size-full object-cover object-center"
                src={imageUrl}
                alt="Interior Design"
              />
            </BentoCell>
          ))}
        </BentoGrid>

        <ContainerScale className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight text-foreground">
              Namaste Design Studio
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
              Creating harmonious spaces that blend traditional Indian aesthetics with contemporary design. 
              Transform your home into a sanctuary of beauty and functionality.
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Palette className="mr-2 h-4 w-4" />
                Start Your Project
              </Button>
              <Button variant="outline" size="lg">
                <Home className="mr-2 h-4 w-4" />
                View Portfolio
              </Button>
            </div>
          </motion.div>
        </ContainerScale>
      </ContainerScroll>

      {/* Proof Section */}
      <section className="bg-background overflow-hidden py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Trusted by Leading Brands</h2>
            <p className="text-muted-foreground">We&apos;ve had the privilege to work with amazing clients</p>
          </div>
          <div className="group relative m-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm text-muted-foreground">Powering beautiful spaces</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  {clientLogos.map((logo, index) => (
                    <div key={index} className="flex items-center">
                      <img
                        className="mx-auto h-12 w-fit opacity-60 hover:opacity-100 transition-opacity"
                        src={logo}
                        alt={`Client ${index + 1}`}
                        height="48"
                        width="auto"
                      />
                    </div>
                  ))}
                </InfiniteSlider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <SectionWithMockup
        title={
          <>
            Comprehensive Design
            <br />
            Solutions
          </>
        }
        description={
          <>
            From residential homes to commercial spaces, we offer
            <br />
            complete interior design services that reflect your
            <br />
            personality and enhance your lifestyle through
            <br />
            thoughtful design and expert craftsmanship.
          </>
        }
        primaryImageSrc="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        secondaryImageSrc="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      {/* Services Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We offer comprehensive interior design services to transform your space into something extraordinary
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Residential Design</CardTitle>
                <CardDescription>
                  Complete home makeovers that reflect your personal style and enhance daily living
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Sofa className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Commercial Spaces</CardTitle>
                <CardDescription>
                  Professional office and retail environments that inspire productivity and success
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Consultation</CardTitle>
                <CardDescription>
                  Expert advice and guidance to help you make the best design decisions for your space
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">
              Hear from our satisfied clients about their experience with Namaste Design Studio
            </p>
          </div>
          <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Get answers to common questions about our design process and services
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is your design process?</AccordionTrigger>
              <AccordionContent>
                Our design process begins with an initial consultation to understand your vision, needs, and budget. 
                We then create detailed design concepts, present material selections, and manage the entire implementation 
                process from start to finish.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How long does a typical project take?</AccordionTrigger>
              <AccordionContent>
                Project timelines vary depending on scope and complexity. A single room typically takes 4-6 weeks, 
                while full home renovations can take 3-6 months. We provide detailed timelines during the planning phase.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Do you work within specific budgets?</AccordionTrigger>
              <AccordionContent>
                Yes, we work with various budget ranges and will create solutions that maximize value within your 
                financial parameters. We&apos;re transparent about costs and provide detailed estimates before starting any work.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Can you incorporate existing furniture?</AccordionTrigger>
              <AccordionContent>
                Absolutely! We love working with pieces that have sentimental value or are in good condition. 
                Our designs often incorporate existing furniture while adding new elements to create a cohesive look.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-muted-foreground">
                              Ready to transform your space? Let&apos;s discuss your project and bring your vision to life.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Visit Our Studio</h3>
                  <p className="text-muted-foreground">
                    123 Design Street<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                  <p className="text-muted-foreground">
                    +91 98765 43210<br />
                    Mon-Fri 9AM-6PM IST
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    hello@namastedesign.studio<br />
                    projects@namastedesign.studio
                  </p>
                </div>
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Start Your Project</CardTitle>
                <CardDescription>
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter your first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter your last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="Enter your phone number" />
                </div>
                <div>
                  <Label htmlFor="project">Project Type</Label>
                  <Input id="project" placeholder="e.g., Living room renovation" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your project and vision..."
                    className="min-h-[100px]"
                  />
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
        <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold tracking-tight">Namaste Design Studio</h2>
              <p className="mb-6 text-muted-foreground">
                Creating beautiful, functional spaces that reflect your unique style and enhance your daily life.
              </p>
              <form className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pr-12 backdrop-blur-sm"
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </form>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Services</h3>
              <nav className="space-y-2 text-sm">
                <a href="#" className="block transition-colors hover:text-primary">
                  Residential Design
                </a>
                <a href="#" className="block transition-colors hover:text-primary">
                  Commercial Spaces
                </a>
                <a href="#" className="block transition-colors hover:text-primary">
                  Consultation
                </a>
                <a href="#" className="block transition-colors hover:text-primary">
                  Project Management
                </a>
                <a href="#" className="block transition-colors hover:text-primary">
                  3D Visualization
                </a>
              </nav>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>
              <address className="space-y-2 text-sm not-italic">
                <p>123 Design Street</p>
                <p>Mumbai, Maharashtra 400001</p>
                <p>Phone: +91 98765 43210</p>
                <p>Email: hello@namastedesign.studio</p>
              </address>
            </div>
            <div className="relative">
              <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
              <div className="mb-6 flex space-x-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Facebook className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Facebook</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Twitter className="h-4 w-4" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Twitter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Instagram className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on Instagram</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full">
                        <Linkedin className="h-4 w-4" />
                        <span className="sr-only">LinkedIn</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Connect with us on LinkedIn</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4" />
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="h-4 w-4" />
                <Label htmlFor="dark-mode" className="sr-only">
                  Toggle dark mode
                </Label>
              </div>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 Namaste Design Studio. All rights reserved.
            </p>
            <nav className="flex gap-4 text-sm">
              <a href="#" className="transition-colors hover:text-primary">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                Terms of Service
              </a>
              <a href="#" className="transition-colors hover:text-primary">
                Cookie Settings
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default NamasteDesignStudio;
