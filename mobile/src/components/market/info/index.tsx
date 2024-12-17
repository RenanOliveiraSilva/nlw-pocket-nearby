import { Text, View } from "react-native";
import { IconProps } from "@tabler/icons-react-native";

import { s } from "./styles";
import { colors } from "@/styles/theme";

type Props = {
    description: String,
    icon: React.ComponentType<IconProps>
}

export function Info({ icon: Icon, description }: Props) {
    return (
        <View style={s.container}>
            <Icon size={16} color={colors.red.base} />
            <Text style={s.text}>{description}</Text>
        </View>
    )
}