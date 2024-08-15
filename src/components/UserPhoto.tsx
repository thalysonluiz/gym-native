import { Image, ImageProps } from "react-native";

type Props = ImageProps & {
  size: number;
}

export function UserPhoto({size, ...rest}: Props){
  return (
    <Image
      width={size}
      height={size}
      className="rounded-full border-2 border-gray-400 mr-4"
      {...rest}
    />
  )
}