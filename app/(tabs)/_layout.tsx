import React from 'react';
import { Tabs } from 'expo-router';
import { TabBar } from '../../components/TabBar';
import {icon} from "../../constants/Icons";

const TabLayout = () => {
    return (
        <Tabs tabBar={(props) => <TabBar {...props} />}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => icon.index({ color, focused }),
                }}
            />
            <Tabs.Screen
                name="customer"
                options={{
                    title: "Customer",
                    tabBarIcon: ({ color, focused }) => icon.customer({ color, focused }),
                }}
            />
            <Tabs.Screen
                name="item"
                options={{
                    title: "Items",
                    tabBarIcon: ({ color, focused }) => icon.item({ color, focused }),
                }}
            />
            <Tabs.Screen
                name="placeOrder"
                options={{
                    title: "Orders",
                    tabBarIcon: ({ color, focused }) => icon.placeOrder({ color, focused }),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "Settings",
                    tabBarIcon: ({ color, focused }) => icon.settings({ color, focused }),
                }}
            />
        </Tabs>
    );
};

export default TabLayout;
