import React from "react";
import { Text, TextInput, View } from "react-native";
import { PrimaryButton, TopBarCard2 } from "../../components";
import { styles } from "./style";

const FrequentVisitor = ({ navigation }) => {
    return (
        <View style={styles.containerOne}>
            <View style={styles.subContainerOne}>
                <TopBarCard2 back={true} txt={'Frequent Visitor'} navigation={navigation} />
            </View>
            <View >

                <View style={styles.subContainerThree}>
                    <Text style={styles.subContainerThreeText} >First Name</Text>
                    <TextInput style={styles.subContainerThreeTextInput} />
                </View>

                <View style={styles.subContainerThree}>
                    <Text style={styles.subContainerThreeText}>Last Name</Text>
                    <TextInput style={styles.subContainerThreeTextInput} />
                </View >

                <View style={styles.subContainerThree}>
                    <Text style={styles.subContainerThreeText}>Aadhar Number</Text>
                    <TextInput style={styles.subContainerThreeTextInput} />
                </View>
                <View style={styles.subContainerThree} >
                    <PrimaryButton
                        bgColor={"#F17171"}
                        text={'Add Visitor'}
                        shadow={true}
                        textColor={"white"}
                    />

                </View>

            </View>
        </View>
    )
}
export default FrequentVisitor;