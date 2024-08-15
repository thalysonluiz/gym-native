import clsx from "clsx";
import { Text, Pressable, PressableProps, View } from "react-native";

type Props = PressableProps & {
  name: string;
  isActive: boolean;
}
export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      className={clsx(
        "bg-gray-600 mr-3 rounded-md justify-center items-center h-10 w-24 active:border-[1px] active:border-green-500",
        {
          "border-green-700 border-[1px]": isActive
        }
      )}
      {...rest}
    >
        <Text className="text-gray-200 uppercase font-bold text-xs">
          { name }
        </Text>
    </Pressable>
  )
}