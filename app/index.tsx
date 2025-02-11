import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useRouter} from "expo-router";
import Animated, {FadeInDown, FadeInRight, FlipInEasyX, FlipOutEasyX} from "react-native-reanimated";
import {StatusBar} from "expo-status-bar";

const Page = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <StatusBar style='light'/>
            <ImageBackground source={require("../assets/img.png")} style={styles.imageBackground}
                             resizeMode="cover">
                <View style={styles.main}>
                    {/* Animated Title */}
                    <Animated.Text style={styles.title} entering={FadeInRight.delay(300).duration(500)}>Stay
                        Updated!</Animated.Text>

                    {/* Animated Subtitle */}
                    <Animated.Text style={styles.subtitle} entering={FadeInRight.delay(700).duration(500)}>Welcome to
                        our Mobile Pos System..
                    </Animated.Text>

                    {/* Button Section */}
                    <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
                        {/* Navigate to Home Screen */}
                        <Animated.View entering={FlipInEasyX.delay(600).duration(500)}
                                       exiting={FlipOutEasyX.delay(600).duration(500)}>
                            <TouchableOpacity style={styles.button} onPress={() => router.replace("/(tabs)")}>
                                <Text style={styles.buttonText}>Get Started</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    main: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 50,
        gap: 10,
        width: "100%",
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        backgroundColor: "#995ac3",
        paddingVertical: 15,
        marginVertical: 20,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 24,
        borderRadius: 25,
        width:'100%',
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
