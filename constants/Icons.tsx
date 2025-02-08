import { Ionicons } from "@expo/vector-icons";

export const icon = {
  index: ({ color, focused }: { color: string; focused: boolean }) =>
      focused ? (
          <Ionicons name="home" size={24} color={color} />
      ) : (
          <Ionicons name="home-outline" size={24} color={color} />
      ),
  customer: ({ color, focused }: { color: string; focused: boolean }) =>
      focused ? (
          <Ionicons name="person" size={25} color={color} />
      ) : (
          <Ionicons name="person-outline" size={25} color={color} />
      ),
  item: ({ color, focused }: { color: string; focused: boolean }) =>
      focused ? (
          <Ionicons name="cube" size={22} color={color} />
      ) : (
          <Ionicons name="cube-outline" size={22} color={color} />
      ),
  placeOrder: ({ color, focused }: { color: string; focused: boolean }) =>
      focused ? (
          <Ionicons name="cart" size={22} color={color} />
      ) : (
          <Ionicons name="cart-outline" size={22} color={color} />
      ),
  settings: ({ color, focused }: { color: string; focused: boolean }) =>
      focused ? (
          <Ionicons name="settings" size={24} color={color} />
      ) : (
          <Ionicons name="settings-outline" size={24} color={color} />
      ),
};
