import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import DatePicker from "react-native-date-picker";
import { digitalDate, timeFromDate } from "../../../utils/dateFormating";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { refreshPlanning } from "../../../utils/signals";

export default function TransportForm({ startDate, user, destination, setIsOpen }) {
    const [error, setError] = useState(null);
    const [openDateModal, setOpenDateModal] = useState(false);
    const [openDepartureTimeModal, setOpenDepartureTimeModal] = useState(false);
    const [openArrivalTimeModal, setOpenArrivalTimeModal] = useState(false);
    const [date, setDate] = useState(startDate ? new Date(startDate.seconds * 1000) : new Date());
    const [departureStation, setDepartureStation] = useState("");
    const [arrivalStation, setArrivalStation] = useState("");
    const [departureTime, setDepartureTime] = useState(startDate ? new Date(startDate.seconds * 1000) : new Date());
    const [arrivalTime, setArrivalTime] = useState(startDate ? new Date(startDate.seconds * 1000) : new Date());
    const [line, setLine] = useState("");

    const addStep = async () => {
        const docRef = doc(db, user, destination);

        if (line !== "") {
        await setDoc(doc(docRef, "planning", `transport-${line}`), {
            type: "Transport",
            date: date,
            line: line,
            departureTime: departureTime,
            arrivalTime: arrivalTime,
            departureStation: departureStation,
            arrivalStation: arrivalStation,
        })
            .then(() => {
                setIsOpen(false);
                refreshPlanning.dispatch();
                setDate(startDate ? new Date(startDate.seconds * 1000) : new Date());
                setDepartureStation("");
                setArrivalStation("");
                setDepartureTime(startDate ? new Date(startDate.seconds * 1000) : new Date());
                setArrivalTime(startDate ? new Date(startDate.seconds * 1000) : new Date());
                setLine("");
            })
            .catch((e) => {
                setError(e.message);
            });
        } else {
            setError("Veuillez saisir une ligne")
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
                value={line}
                placeholder="Ligne"
                onChangeText={(value) => setLine(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={departureStation}
                placeholder="Station de départ"
                onChangeText={(value) => setDepartureStation(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={arrivalStation}
                placeholder="Station d'arrivé"
                onChangeText={(value) => setArrivalStation(value)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <TextInput
                style={styles.input}
                value={timeFromDate(departureTime)}
                placeholder="Heure de départ"
                onFocus={() => setOpenDepartureTimeModal(true)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <DatePicker
                modal
                open={openDepartureTimeModal}
                style={styles.datePicker}
                date={departureTime}
                onConfirm={(value) => {
                    setOpenDepartureTimeModal(false);
                    setDepartureTime(value);
                }}
                onCancel={() => {
                    setOpenDepartureTimeModal(false);
                }}
                mode="time"
                title="Selectionner une heure de départ"
                confirmText="Confirmer"
                cancelText="Annuler"
                theme="light"
            />
            <TextInput
                style={styles.input}
                value={timeFromDate(arrivalTime)}
                placeholder="Heure d'arrivée"
                onFocus={() => setOpenArrivalTimeModal(true)}
                placeholderTextColor={"rgba(0, 0, 0, 0.3)"}
            />
            <DatePicker
                modal
                open={openArrivalTimeModal}
                style={styles.datePicker}
                date={arrivalTime}
                onConfirm={(value) => {
                    setOpenArrivalTimeModal(false);
                    setArrivalTime(value);
                }}
                onCancel={() => {
                    setOpenArrivalTimeModal(false);
                }}
                mode="time"
                title="Selectionner une heure d'arrivée"
                confirmText="Confirmer"
                cancelText="Annuler"
                theme="light"
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
})