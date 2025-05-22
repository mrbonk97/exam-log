import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

export const UnsolvedProblemNav = () => {
  return (
    <Drawer>
      <DrawerTrigger className="absolute bottom-5 right-20">히히</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>풀지않은 문제</DrawerTitle>
          <DrawerDescription>문제 번호를 클릭하여 이동할 수 있습니다.</DrawerDescription>
        </DrawerHeader>
        <ul className="my-10 mx-auto w-fit grid grid-cols-5 gap-5 overflow-y-auto">
          {Array.from({ length: 100 }).map((item, idx) => (
            <li
              key={`nav-q-${idx}`}
              className="h-10 w-10 col-span-1 border rounded-xl hover:bg-secondary"
            >
              {idx}
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};
