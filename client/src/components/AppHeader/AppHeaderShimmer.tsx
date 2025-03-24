import ShimmerButton from "../ui/Shimmer/ShimmerButton";

function AppHeaderShimmer() {
  return (
    <header>
      <div className="container mx-auto gap-1 flex h-10 items-center">
        <ShimmerButton className="w-32" />
        <ShimmerButton className="w-12 ml-auto" />
        <ShimmerButton className="w-16" />
      </div>
    </header>
  );
}

export default AppHeaderShimmer;
