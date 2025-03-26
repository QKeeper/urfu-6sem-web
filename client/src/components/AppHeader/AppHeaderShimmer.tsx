import ShimmerButton from "../ui/Shimmer/ShimmerButton";

function AppHeaderShimmer() {
  return (
    <header>
      <div className="container mx-auto flex h-10 items-center gap-1">
        <ShimmerButton className="w-32" />
        <ShimmerButton className="ml-auto w-12" />
        <ShimmerButton className="w-16" />
      </div>
    </header>
  );
}

export default AppHeaderShimmer;
