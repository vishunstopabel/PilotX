function SideBord() {
  // const [textIndex, setTextIndex] = useState<number>(0);

  // const texts: string[] = ["Gmail", "Google Drive", "Calendar"];

  // useEffect(() => {
  //   animateItems();
  // }, []);

  // function animateItems() {
  //   animate(
  //     ".s3desk-text",
  //     {
  //       opacity: 1,
  //       backdropFilter: "blur(0px)",
  //     },
  //     {
  //       duration: 3,
  //     }
  //   );

  //   animate(
  //     ".bucket-image",
  //     {
  //       y: 0,
  //       x: 0,
  //       rotate: 0,
  //       filter: "blur(0px)",
  //     },
  //     {
  //       duration: 2,
  //     }
  //   );
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTextIndex((prev) => (prev + 1) % texts.length);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [texts.length]);

  return (
    <div className="w-1/2 flex justify-center items-center relative mask-x-from-88% mask-x-to-100% mask-y-from-88% mask-y-to-100%">
      {/* <div className="w-10/12 h-10/12 relative flex">
        <div className="mx-auto mt-70">
          <div className="text-3xl font-extrabold ml-30 text-neutral-800 dark:text-neutral-200 flex flex-col w-[42rem] text-center">
            <div className="space-x-2 flex relative">
              <motion.p
                initial={{ opacity: 0 }}
                className="tracking-wide bg-clip-text text-transparent 
             bg-gradient-to-r from-green-500/40 via-green-600 to-green-700/60 dark:from-green-300/40 dark:via-green-400 dark:to-green-500/60 s3desk-text"
              >
                S3DESK
              </motion.p>
              <p className="text-neutral-800 dark:text-neutral-200">
                POWER FULL
              </p>
              <motion.div className="transition-all text2 duration-300 bg-neutral-900/90 text-neutral-200 dark:bg-neutral-100 dark:text-neutral-900 backdrop-blur-3xl">
                {texts[textIndex]}
              </motion.div>
            </div>

            <p className="text-neutral-800 dark:text-neutral-200">OF AWS S3</p>
          </div>

          <div className="w-[40rem] text-center ml-20 mt-20 text-neutral-500 dark:text-neutral-300">
            With lots of AI applications around, Everything AI stands out with
            its state of the art Shitposting capabilities.
          </div>
        </div>
      </div> */}

      <div
        className="w-full absolute z-10 h-px top-15"
        style={{
          borderTop: "2px dashed transparent",
          borderImage:
            "repeating-linear-gradient(to right, var(--border-color, #4b5563) 0, var(--border-color, #4b5563) 20px, transparent 20px, transparent 30px)",
          borderImageSlice: 1,
        }}
      />
      <div
        className="w-full absolute z-10 h-px bottom-15"
        style={{
          borderTop: "2px dashed transparent",
          borderImage:
            "repeating-linear-gradient(to right, var(--border-color, #4b5563) 0, var(--border-color, #4b5563) 20px, transparent 20px, transparent 30px)",
          borderImageSlice: 1,
        }}
      />
      <div
        className="w-px absolute z-10 h-full right-30"
        style={{
          borderLeft: "1px dashed transparent",
          borderImage:
            "repeating-linear-gradient(to bottom, var(--border-color, #4b5563) 0, var(--border-color, #4b5563) 20px, transparent 20px, transparent 30px)",
          borderImageSlice: 1,
        }}
      />
      <div
        className="w-px absolute z-10 h-full left-30"
        style={{
          borderLeft: "1px dashed transparent",
          borderImage:
            "repeating-linear-gradient(to bottom, var(--border-color, #4b5563) 0, var(--border-color, #4b5563) 20px, transparent 20px, transparent 30px)",
          borderImageSlice: 1,
        }}
      />

      {/* <motion.img
        className="absolute mx-auto top-[22%] left-[13%] w-40 h-40 bucket-image -z-1 mask-y-from-80% mask-y-to 100% dark:mask-y-from-30% dark:mask-y-to-100% dark:invert"
        src={img1}
        alt="S3 Bucket"
        initial={{
          y: -100,
          x: -100,
          rotate: -20,
          filter: "blur(5px)",
        }}
      /> */}
    </div>
  );
}

export default SideBord;
