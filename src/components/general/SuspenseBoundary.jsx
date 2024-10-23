
import { Suspense } from "react";
const SuspenseBoundary = ({ children }) => {
  return <Suspense fallback={
    <p className="">Loading...</p>
}>
    {children}
    </Suspense>;
};
export default SuspenseBoundary;