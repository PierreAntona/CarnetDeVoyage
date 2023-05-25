import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { getAuth, signOut } from "firebase/auth";
import * as SecureStore from 'expo-secure-store';

const Account = ({ username, adress, number, navigation }) => {


    const logOut = () => {
        const auth = getAuth();

        signOut(auth).then(async () => {
            SecureStore.deleteItemAsync("_adress");
            navigation.navigate("Connexion");
        }).catch((e) => {
            console.log(e);
        });
    }

    return (
        <>
            <View style={styles.content}>
                <View>
                    <Text style={styles.label}>Utilisateur</Text>
                    <Text style={styles.info}>{username}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Adresse e-mail</Text>
                    <Text style={styles.info}>{adress}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Voyages</Text>
                    <Text style={styles.info}>{number}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={() => logOut()}>
                <Text style={styles.buttonText}>Déconnexion</Text>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
        </>
    )
}

export default Account

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    label: {
        fontFamily: 'NotoSans-Light',
        fontSize: 13
    },
    info: {
        fontFamily: 'NotoSans-Regular',
        fontSize: 18,
        top: -2,
        marginBottom: 14
    },
    logout: {
        alignSelf: "flex-end"
    },
    button: {
        alignSelf: "flex-end",
        flexDirection: "row",
        justifyContent: "center",
        paddingBottom: 30
    },
    buttonText: {
        color: "#000",
        fontSize: 20,
        fontFamily: "Playfair-Regular",
    },
    arrow: {
        color: "#000",
        fontSize: 20,
        fontFamily: "NotoSans-Light",
        marginLeft: 10,
    },
})