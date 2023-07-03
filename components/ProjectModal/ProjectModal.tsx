"use client";
import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface Props {
  children: ReactNode;
}

const ProjectModal = ({ children }: Props) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.push("/");
  }, [router]);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === overlayRef.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlayRef]
  );

  return (
    <div
      ref={overlayRef}
      className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/80"
      onClick={handleClick}
    >
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-4 right-8"
      >
        <Image src="/close.svg" width={17} height={17} alt="close" />
      </button>

      <div
        ref={wrapperRef}
        className="flex justify-start items-center flex-col absolute h-[95%] w-full bottom-0 bg-white rounded-t-3xl lg:px-40 px-8 pt-14 pb-72 overflow-auto"
      >
        {children}
      </div>
    </div>
  );
};

export default ProjectModal;
