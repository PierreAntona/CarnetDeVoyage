import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { textDate, timeFromTimestamp } from "../../utils/dateFormating";
import { db } from "../../firebase/config";

const StepCard = ({ data, index, previousDate }) => {
    const {
        date,
        departureAirport,
        departureStation,
        arrivalAirport,
        arrivalStation,
        departureTime,
        arrivalTime,
        reference,
        name,
        gate,
        seat,
        number,
        adress,
        breakfast,
        time,
        description,
        line,
        type
    } = data

    const checkDate = () => {
        const today = new Date();
        return today.getTime() > date.seconds * 1000
    }

    return (
        <>
            {previousDate !== textDate(date) &&
                <View style={styles.steps}>
                    <Text style={[styles.date, checkDate() && { color: "gray" }]}>{textDate(date)}</Text>
                </View>
            }
            <View style={styles.container}>
                <View style={styles.timeline} />
                <View style={styles.header}>
                    <View style={styles.step}>
                        <View style={[styles.stepCircle, checkDate() && { borderColor: "gray" }]}>
                            <Text style={[styles.stepNumber, checkDate() && { color: "gray" }]}>{index + 1}</Text>
                        </View>
                    </View>
                    <View style={styles.headerContent}>
                        {type == "Vol" && <>
                            <Text style={[styles.title, checkDate() && { color: "gray" }]}>{departureAirport} → {arrivalAirport}</Text>
                            <Text style={styles.time}>{timeFromTimestamp(departureTime)} - {timeFromTimestamp(arrivalTime)}</Text>
                        </>}

                        {type == "Logement" && <>
                            <Text style={[styles.title, checkDate() && { color: "gray" }]}>Hébergement</Text>
                            <Text style={[styles.time, checkDate() && { color: "gray" }]}>{breakfast ? "Petit déjeuner compris" : "Petit déjeuner non compris"}</Text>
                        </>
                        }

                        {type == "Transport" && <>
                            <Text style={[styles.title, checkDate() && { color: "gray" }]}>{departureStation} → {arrivalStation}</Text>
                            <Text style={styles.time}>{timeFromTimestamp(departureTime)} - {timeFromTimestamp(arrivalTime)}</Text>
                        </>
                        }

                        {type == "Restaurant" && <>
                            <Text style={[styles.title, checkDate() && { color: "gray" }]}>{name}</Text>
                            <Text style={styles.time}>{timeFromTimestamp(time)}</Text>
                        </>
                        }

                        {type == "Visite" && <>
                            <Text style={[styles.title, checkDate() && { color: "gray" }]}>{name}</Text>
                            <Text style={styles.time}>{timeFromTimestamp(time)}</Text>
                        </>
                        }

                        {type == "Autre" && <>
                            <Text style={[styles.title, checkDate() && { color: "gray" }]}>{name}</Text>
                            <Text style={styles.time}>{description}</Text>
                        </>
                        }
                    </View>
                </View>
                <View style={styles.content}>
                    {reference && <Text style={styles.infoType}>Référence :
                        <Text style={styles.info}> {reference}</Text>
                    </Text>}
                    {gate && <Text style={styles.infoType}>Porte d’embarquement :
                        <Text style={styles.info}> {gate}</Text>
                    </Text>}
                    {line && <Text style={styles.infoType}>Ligne :
                        <Text style={styles.info}> {line}</Text>
                    </Text>}
                    {seat && <Text style={styles.infoType}>Siège :
                        <Text style={styles.info}> {seat}</Text>
                    </Text>}
                    {adress && <Text style={styles.infoType}>Adresse :
                        <Text style={styles.info}> {adress}</Text>
                    </Text>}
                    {number && <Text style={styles.infoType}>Numéro de téléphone :
                        <Text style={styles.info}> {number}</Text>
                    </Text>}
                </View>
            </View>
        </>
    )
}

export default StepCard;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        paddingTop: 24,
        paddingHorizontal: 12,
    },
    steps: {
        backgroundColor: "#100D05",
        paddingBottom: 16,
        paddingTop: 4
    },
    date: {
        fontSize: 20,
        fontFamily: "Playfair-Bold",
        color: "#FFF",
        textAlign: "center",
    },
    timeline: {
        position: "absolute",
        backgroundColor: "#FFF",
        width: 2,
        height: "140%",
        top: 0,
        left: 40
    },
    header: {
        flexDirection: "row",
        alignItems: "center"
    },
    step: {
        width: 58,
        height: 68,
        backgroundColor: "#100D05",
        marginRight: 6,
        justifyContent: "center",
        alignItems: "center"
    },
    stepCircle: {
        borderWidth: 1,
        borderColor: "#E5CA93",
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25
    },
    stepNumber: {
        fontSize: 34,
        lineHeight: 34,
        fontFamily: "Playfair-Black",
        color: "#E5CA93",
    },
    headerContent: {

    },
    title: {
        fontFamily: "NotoSans-Light",
        fontSize: 20,
        color: "#E5CA93",
        maxWidth: 300
    },
    time: {
        fontFamily: "NotoSans-Light",
        fontSize: 18,
        color: "#FFF"
    },
    content: {
        marginLeft: 64,
        marginTop: 18,
        marginBottom: 24,
    },
    infoType: {
        fontFamily: "NotoSans-Light",
        color: "#FFF",
        fontSize: 13,
        lineHeight: 18
    },
    info: {
        fontFamily: "NotoSans-Regular",
        color: "#FFF",
        fontSize: 13,
        lineHeight: 18
    },
})