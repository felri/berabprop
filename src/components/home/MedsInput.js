import React, { useState } from 'react'
import { StyleSheet, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native'
import { connect } from 'react-redux'

import { Text, DateUtils } from 'lib'
import { theme } from '_appSetup/Theme'

import { entryMedication, removeMedication } from 'actions/Entries'

import HourPicker from 'components/dataentry/HourPicker'

import addMed from 'assets/images/meds/addMed.png'
import pillIcon from 'assets/images/meds/pill.png'

const ActionButton = (props) => {
  return (
    <TouchableOpacity style={styles.actionButtonWrapper} onPress={props.onPress}>
      <Text text={props.text} allowStyles style={styles.actionButtonText} />
    </TouchableOpacity>
  )
}

const MedsModal = (props) => {
  const { med, initialMeta } = props

  const [amount, setAmount] = useState(initialMeta ? initialMeta.amount : 1)
  const [date, setDate] = useState(initialMeta ? initialMeta.timestamp : new Date())
  const [isHourPickerVisible, setHourPickerVisible] = useState(false)


  const entry = () => {
    if (initialMeta) removeMedication(initialMeta, props.selectedDay)
    if (amount > 0) entryMedication(amount, med, date, props.selectedDay)
    props.closeModal()
  }

  const hideDateTimePicker = (date = null) => {
    if (date) setDate(date)
    setHourPickerVisible(true)
  }

  return (
    <TouchableWithoutFeedback onPress={props.closeModal}>
      <View style={styles.modalWrapper}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContentWrapper}>
            <View style={styles.modalSelectionArea}>

              <View style={styles.purpleBg}>
                <View style={styles.pillBg}>
                  <Image style={styles.pillIcon} source={pillIcon} />
                  <Text text={`x ${amount}`} allowStyles style={styles.pillCount} />
                </View>

                <View style={styles.actionButtonRow}>
                  <ActionButton text={'-0.5'} onPress={() => setAmount(Math.max(0, amount - 0.5))} />
                  <ActionButton text={'-1'} onPress={() => setAmount(Math.max(0, amount - 1))} />
                  <ActionButton text={'+0.5'} onPress={() => setAmount(amount + 0.5)} />
                  <ActionButton text={'+1'} onPress={() => setAmount(amount + 1)} />
                </View>
              </View>

              <View style={styles.whiteBg}>

                <Text text={med.name} />
                <View style={styles.modalDosageRow}>
                  <Text text={`${med.unitAmount * amount} ${med.unit}`} allowStyles style={styles.dosageAmount} />
                  <TouchableOpacity onPress={() => setHourPickerVisible(true)}>
                    <Text text={DateUtils.jsDateToHumanTime(date)} allowStyles style={styles.dosageTime} />
                  </TouchableOpacity>

                  <HourPicker
                    isHourPickerVisible={isHourPickerVisible}
                    hideDateTimePicker={(date) => hideDateTimePicker(date)}
                  />

                </View>

              </View>


            </View>
            <TouchableOpacity style={styles.confirmButton} onPress={entry}>
              <Text text={'Confirm'} allowStyles style={{ color: 'white' }} />
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>

    </TouchableWithoutFeedback>
  )
}

const MedEntry = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.medEntryWrapper}>
      <View style={styles.medEntryAmountWrapper}>
        <Text text={props.med.amount} allowStyles style={styles.medEntryAmount} />
      </View>
      <Text text={DateUtils.jsDateToHumanTime(props.med.timestamp)} allowStyles style={styles.medTime} />
    </TouchableOpacity>
  )
}

const MedsInput = (props) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [modalMeta, setModalMeta] = useState(null)

  const { med } = props

  let sum = 'Total'
  let color = false
  if (props.entries.length > 0) {
    color = true
    sum = 0
    props.entries.forEach(e => {
      sum += (e.amount * e.med.unitAmount)
    })
    sum = `${sum} ${props.entries[0].med.unit}`
  }

  const editEntry = (e) => {
    setModalMeta(e)
    setModalVisible(true)
  }

  const closeModal = () => {
    setModalVisible(false)
    setModalMeta(null)
  }

  return (
    <View style={styles.wrapper}>
      <Text text={med.name} />
      <Text text={`${med.unitAmount} ${med.unit}`} allowStyles style={styles.unitText} />
      <View style={styles.actionRow}>

        <View style={styles.actionRowEntries}>
          {props.entries.map((e, index) => <MedEntry key={index} med={e} onPress={() => editEntry(e)} />)}
          {props.entries.length < 6 ? (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={addMed} style={styles.addMedIcon} />
            </TouchableOpacity>
          ) : null}

        </View>

        <View style={[styles.totalWrapper, color ? { borderColor: theme.colors.highlighting } : null]}>
          <Text text={sum} allowStyles style={[styles.totalText, color ? { color: theme.colors.highlighting } : null]} />
        </View>
      </View>

      <Modal
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <MedsModal
          med={med}
          selectedDay={props.selectedDay}
          closeModal={closeModal}
          initialMeta={modalMeta}
        />
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopWidth: 1,
    borderColor: '#eee',
    padding: theme.spacing(2),
  },
  medEntryWrapper: {
    marginRight: theme.spacing(0.5),
    alignItems: 'center',
  },
  medEntryAmountWrapper: {
    ...theme.center,
    width: 36,
    height: 36,
    backgroundColor: theme.colors.highlighting,
    borderRadius: theme.spacing(1),
  },
  medEntryAmount: {
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    color: 'white',
  },
  medTime: {
    marginTop: theme.spacing(0.5),
    fontSize: 12,
  },
  actionRow: {
    ...theme.row,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: theme.spacing(1),
  },
  actionRowEntries: {
    ...theme.row,
    alignItems: 'flex-start',
  },
  unitText: {
    opacity: 0.5,
  },
  addMedIcon: {
    width: 36,
    height: 36,
  },
  totalWrapper: {
    ...theme.center,
    borderRadius: theme.spacing(1),
    borderWidth: 1,
    borderColor: '#eee',
    padding: theme.spacing(1),
    minWidth: 70,
  },
  totalText: {
    color: '#ddd',
  },
  modalWrapper: {
    ...theme.center,
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContentWrapper: {
    alignItems: 'center',
  },
  modalSelectionArea: {
    borderRadius: theme.spacing(2),
    backgroundColor: 'white',
    alignItems: 'center',
  },
  confirmButton: {
    ...theme.row,
    ...theme.center,
    backgroundColor: '#3BB7B0',
    height: 50,
    width: 200,
    borderRadius: 25,
    margin: theme.spacing(2),
  },
  purpleBg: {
    borderTopLeftRadius: theme.spacing(2),
    borderTopRightRadius: theme.spacing(2),
    backgroundColor: '#6C70F3',
    alignItems: 'center',
  },
  whiteBg: {
    borderBottomLeftRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    alignSelf: 'stretch',
    padding: theme.spacing(2),
  },
  modalDosageRow: {
    ...theme.row,
    justifyContent: 'space-between',
    marginTop: theme.spacing(1),
  },
  dosageAmount: {
    fontSize: 20,
    color: theme.colors.highlighting,
  },
  dosageTime: {
    fontSize: 20,
  },
  pillBg: {
    ...theme.row,
    margin: theme.spacing(2),
    padding: theme.spacing(1),
    paddingHorizontal: theme.spacing(2),
    borderRadius: theme.spacing(2),
    backgroundColor: '#4D50B4',
  },
  pillIcon: {
    width: 40,
    height: 40,
    marginRight: theme.spacing(1),
  },
  pillCount: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  actionButtonRow: {
    ...theme.row,
    justifyContent: 'space-around',
    width: 250,
    marginHorizontal: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  actionButtonWrapper: {
    ...theme.circle(45),
    ...theme.center,
    backgroundColor: 'white',
  },
  actionButtonText: {
    color: theme.colors.highlighting,
  },
})

function MapStateToProps(state, ownProps) {
  const selectedDay = state.HomeScene.selectedDay
  const date = DateUtils.timestampToYYYYMMDD(Date.parse(selectedDay))
  let entries = state.Entries[date] ? state.Entries[date].filter(e => e.type == 'MEDICATION' && e.med.name == ownProps.med.name) : []
  entries.sort((a, b) => a.timestamp - b.timestamp)
  return {
    entries,
    selectedDay,
  }
}

export default connect(MapStateToProps)(MedsInput)
