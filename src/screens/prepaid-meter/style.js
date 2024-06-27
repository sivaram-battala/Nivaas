import { StyleSheet } from "react-native";
import { colors } from "../../common";

export const styles = StyleSheet.create({
  mainCon: {
    height: '100%',
    backgroundColor: colors.white,
  },
  container: {
    paddingHorizontal: '6%',
    paddingVertical: '5%',
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  dropDownView: {
    width: '100%',
    paddingHorizontal: '6%',
  },
  container2: {
    marginHorizontal: '5%',
    marginVertical: '10%',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.gray3,
    padding: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    color: colors.black,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
    paddingBottom: 5,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  itemText: {
    fontSize: 15,
    color: colors.black,
    fontWeight: '500',
  },
  buttonCon: {
    marginHorizontal: '6%',
  },
  updateButton: {
    marginTop: '5%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    marginVertical: '50%',
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryColor,
  },
  metersDetailsText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 5,
  },
  updateModalContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    padding: '5%',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  tableHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingRight: '15%',
    paddingLeft: '4%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray2,
  },
  cell: {
    fontSize: 14,
    color: colors.black,
  },
  flatListContainer: {
    paddingBottom: 10,
  },
  inputContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray2,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});
  