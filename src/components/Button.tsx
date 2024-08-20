import clsx from "clsx";
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type Variants = "solid" | "outline"

type Props = TouchableOpacityProps & {
  title: string;
  variant?: Variants,
  isLoading?: boolean
}
export function Button({title, variant = "solid", isLoading = false, ...rest}: Props){
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{ width: '100%'}}
      disabled={isLoading}
      {...rest}
    >
      <View className={clsx(
          "w-full h-14 justify-center items-center rounded-md",
          {
            "bg-green-700": variant === "solid",
            "border-[1px] bg-transparent border-green-500": variant === "outline",
            "opacity-60": isLoading
          }
        )}>
          { isLoading ? (
            <ActivityIndicator className={clsx(
              "color-white",
              { 
                "color-green-500": variant === "outline"
              }
              )} />
          ) : (
            <Text className={clsx(
              "font-heading text-sm",
              { 
                "text-white": variant === "solid",
                "text-green-500": variant === "outline"
              }
              )}>{title}</Text>
          )}
        
      </View>
    </TouchableOpacity>
  )
}