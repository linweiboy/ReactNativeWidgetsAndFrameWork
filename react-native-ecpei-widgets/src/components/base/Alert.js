/**
 * Created by tanlinwei
 *
 * Description:  前版本所用到的弹框
 */
import React, {
	Component
} from 'react';
import PropTypes from "prop-types";
import {
	StyleSheet,
	View,
	Modal,
	Text,
	Dimensions,
	TouchableHighlight,TouchableOpacity,
} from 'react-native';
import { TouchableOpacityThrottle, ConnectTouchable, TouchableType } from "../../ThemeComponent/Button/TouchableThrottle";
export default class Alert extends Component {
	constructor(props) {
		super(props);
		this.state = Object.assign({
			flag: false,
		}, this.props);
	}
	static defaultProps = {
		msg: '提示信息',
		callback: () => { },
		btnText: '确定',
		buttons: [],
		isClosed: true,
		isMaskLayer:true,//是否可以关闭遮罩层，true为不可关闭
	}
	static propTypes = {
		msg: PropTypes.string.isRequired, //提示信息
		title: PropTypes.string,
		callback: PropTypes.func,
		btnText: PropTypes.string
	}

	open = (options) => {
		this.setState(Object.assign({
			flag: true,
		}, options));
	}

	close() {
		this.setState({
			flag: false
		});
	}
	_onPress = (m) => {
		this.setState({
			flag: false
		});
		if (m.callback && m.callback.constructor.name == "Function")
			m.callback();
		else
			this.state.callback(m.callback);
	}
	render() {
		return (
			<View>
				<Modal animationType={"none"}
					transparent={true}
					visible={this.state.flag}
					onRequestClose={() => {
						this.setState({
							flag: false
						});
					}}>
					<TouchableOpacityThrottle style={{flex:1}} activeOpacity={this.state.isMaskLayer?1:0}  onPress={() => {
							this.setState({
								flag: this.state.isMaskLayer
							});
					}}>
						<View style={styles.alertModal}>
							<View style={[styles.alert]}>
								{this.state.title ?
									<View style={styles.title}>
										<Text style={styles.titleCon}>{this.state.title}</Text>
									</View>
									: null
								}
								<TouchableHighlight>
									<Text style={styles.text} >{this.state.msg}</Text>
								</TouchableHighlight>
								<View style={styles.btn}>
									{
										this.state.buttons.map((m, index) => {
											return < TouchableHighlight key={index} underlayColor='#eee' onPress={() => { this._onPress(m); }} style={[m.style, styles.btnClick]} >
												<Text style={[{ color: m.color }, m.btnType ? (m.btnType == "primary" ? { color: "#229AFF" } : {}) : {}, styles.btnText]}>{m.text}</Text>
												</TouchableHighlight>
										})
									}
								</View>
							</View>
							
						</View>
					</TouchableOpacityThrottle>
				</Modal>
				

			</View>
		);
	}
}
let _width = Dimensions.get('window').width;
const styles = StyleSheet.create({
	alertModal: { flex: 1, alignItems: "center", justifyContent: "center", flexDirection: "column", backgroundColor: "rgba(0,0,0,.45)" },
	alert: { width: .7 * _width, backgroundColor: "rgba(255,255,255,1)", flexDirection: "column", alignItems: "center", justifyContent: "center", borderRadius: 5, overflow: "hidden" },
	title: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 40, borderBottomColor: "#eee", borderBottomWidth: .5 },
	titleCon: { flex: 1, textAlign: "center", fontSize: 16 },
	text: { paddingTop: 25, paddingLeft: 30, paddingRight: 30, paddingBottom: 20, marginTop: 5, marginBottom: 5, fontSize: 14, color: "#4f4f53", lineHeight: 22 },
	btn: { flexDirection: "row", alignItems: "center", justifyContent: "center", height: 45, borderTopColor: "#eee", borderTopWidth: 1, overflow: "hidden" },
	btnClick: { flex: 1, alignItems: "center", justifyContent: "center", overflow: "hidden" },
	btnText: { flex: 1, textAlign: "center", textAlignVertical: "center", overflow: "hidden", fontSize: 15 }
});
