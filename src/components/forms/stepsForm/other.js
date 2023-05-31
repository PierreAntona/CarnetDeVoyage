import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { digitalDate } from "../../../utils/dateFormating";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { refreshPlanning } from "../../../utils/signals";

export default function OtherForm({ startDate, user, destination, setIsOpen }) {
    const [error, setError] = useState(null);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [date, setDate] = useState(startDate ? new Date(startDate.seconds * 1000) : new Date());
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [adress, setAdress] = useState("");

    const addStep = async () => {
        const docRef = doc(db, user, destination);

        if (name !== "") {
            await setDoc(doc(docRef, "planning", `other-${name}`), {
                type: "Autre",
                name: name,
                date: date,
                adress: adress,
                description: description,
            })
            setIsOpen(false);
            refreshPlanning.dispatch();
            setDate(startDate ? new Date(startDate.seconds * 1000) : new Date());
            setAdress("");
            setName("");
            setDescription("");
        } else {
            setError("Veuillez saisir un nom d'étape")
        }
    }

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
                value={name}
                placeholder="Nom d'étape"
                onChangeText={(value) => setName(value)}
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
                value={description}
                placeholder="Description"
                onChangeText={(value) => setDescription(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
                keyboardType="number-pad"
            />

            {error &&
                <Text style={styles.error}>{error}</Text>
            }

            <TouchableOpacity style={styles.button} onPress={() => addStep()}>
                <Text style={styles.buttonText}>Ajouter</Text>
                <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
        </>
    );
};

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
        borderWidth: 1
    },
    choiceText: {
        fontSize: 16,
        fontFamily: "NotoSans-Light",
    }
})