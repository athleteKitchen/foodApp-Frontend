import { MaterialCommunityIcons, Ionicons, MaterialIcons, FontAwesome6 } from "@expo/vector-icons";

export const icons = {
    Meals: (props)=> <MaterialCommunityIcons name="dumbbell" size={26} {...props} />,
    Plan: (props)=> <MaterialIcons name="fitbit" size={26} {...props} />,
    Cart: (props)=> <FontAwesome6 name="cart-plus" size={26} {...props} />,
    Orders: (props)=> <Ionicons name="bag-check" size={26} {...props} />,
    Profile: (props)=> <MaterialIcons name="account-circle" size={26} {...props} />,
}