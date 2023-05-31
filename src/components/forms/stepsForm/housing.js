import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import DatePicker from "react-native-date-picker";
import { digitalDate } from "../../../utils/dateFormating";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { refreshPlanning } from "../../../utils/signals";

export default function HousingForm({
    startDate,
    user,
    destination,
    setIsOpen,
}) {
    const [error, setError] = useState(null);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [date, setDate] = useState(
        startDate ? new Date(startDate.seconds * 1000) : new Date()
    );
    const [adress, setAdress] = useState("");
    const [reference, setReference] = useState("");
    const [number, setNumber] = useState("");
    const [breakfast, setBreakfast] = useState(false);

    const addStep = async () => {
        const docRef = doc(db, user, destination);

        if (reference !== "") {
            await setDoc(doc(docRef, "planning", `housing-${reference}`), {
                type: "Logement",
                reference: reference,
                date: date,
                adress: adress,
                number: number,
                breakfast: breakfast,
            });
            setIsOpen(false);
            refreshPlanning.dispatch();
            setDate(startDate ? new Date(startDate.seconds * 1000) : new Date());
            setAdress("");
            setNumber("");
            setReference("");
            setBreakfast("");
        } else {
            setError("Veuillez saisir une référence");
        }
    };

    return (
        <>
            <TextInput
                style={styles.input}
                value={digitalDate(date)}
                onFocus={() => setOpenDateModal(true)}
                placeholder="Date"
            />
            <DatePicker
                modal
                open={openDateModal}
                style={styles.datePicker}
                date={date}
                onConfirm={(value) => {
                    setOpenDateModal(false);
                    setDate(value);
                }}
                onCancel={() => {
                    setOpenDateModal(false);
                }}
                mode="date"
                title="Selectionner une date"
                confirmText="Confirmer"
                cancelText="Annuler"
                theme="light"
            />

            <TextInput
                style={styles.input}
                value={reference}
                placeholder="Code de réservation"
                onChangeText={(value) => setReference(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={adress}
                placeholder="Adresse"
                onChangeText={(value) => setAdress(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={number}
                placeholder="Numéro de téléphone"
                onChangeText={(value) => setNumber(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
                keyboardType="number-pad"
            />
            <View style={styles.breakfast}>
                <Text style={styles.breakfastText}>Petit déjeuner</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={[styles.choice, breakfast && { backgroundColor: "#000" }]}
                        onPress={() => setBreakfast(true)}
                    >
                        <Text
                            style={[styles.choiceText, breakfast && { color: "#E5CA93" }]}
                        >
                            Avec
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.choice, !breakfast && { backgroundColor: "#000" }]}
                        onPress={() => setBreakfast(false)}
                    >
                        <Text
                            style={[styles.choiceText, !breakfast && { color: "#E5CA93" }]}
                        >
                            Sans
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {error && <Text style={styles.error}>{error}</Text>}

            <TouchableOpacity style={styles.button} onPress={() => addStep()}>
                <Text style={styles.buttonText}>Ajouter</Text>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: 1,
        fontSize: 18,
        fontFamily: "NotoSans-Light",
        width: "100%",
        marginBottom: 20,
        height: 50,
    },
    error: {
        color: "red",
        textAlign: "center",
    },
    button: {
        alignSelf: "flex-end",
        marginTop: 20,
        marginBottom: 100,
        flexDirection: "row",
        justifyContent: "center",
    },
    buttonText: {
        fontSize: 20,
        fontFamily: "Playfair-Regular",
    },
    arrow: {
        fontSize: 20,
        fontFamily: "NotoSans-Light",
        marginLeft: 10,
    },
    breakfast: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        justifyContent: "space-between",
    },
    breakfastText: {
        fontSize: 18,
        fontFamily: "NotoSans-Light",
    },
    buttons: {
        flexDirection: "row",
    },
    choice: {
        marginLeft: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderColor: "#000",
        borderWidth: 1,
    },
    choiceText: {
        fontSize: 16,
        fontFamily: "NotoSans-Light",
    },
});
