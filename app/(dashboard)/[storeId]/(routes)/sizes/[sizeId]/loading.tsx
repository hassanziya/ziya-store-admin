import LoaderSpinner from '@/components/ui/spinner';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100vh]">
      <LoaderSpinner width={10} height={10} />
    </div>
  );
};

export default Loading;
