import React, { PureComponent } from 'react'
import { RefreshControl } from 'react-native'
import { theme } from '_appSetup/Theme'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TimerMixin from 'react-timer-mixin'
import ReactMixin from 'react-mixin'
import equals from 'deep-equal'

class Scroll extends PureComponent {
  constructor(props) {
    super(props)
    this.onRefresh = this.onRefresh.bind(this)
    this.state = {
      refreshing: false,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.state.refreshing && this.props.extraData) {
      if (!equals(this.props.extraData, prevProps.extraData)) {
        this.setState({ refreshing: false })
      }
    }
  }

  onRefresh() {
    this.setState({ refreshing: true })
    this.props.onRefresh()
    this.setTimeout(() => {
      this.setState({ refreshing: false })
    }, 6000)
  }

  render() {
    return (
      <KeyboardAwareScrollView
        style={[theme.full]}
        {...this.props}
        refreshControl={
          this.props.onRefresh &&
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
        }
      >
        {this.props.children}
      </KeyboardAwareScrollView>
    )
  }
}

ReactMixin(Scroll.prototype, TimerMixin)

export default Scroll
