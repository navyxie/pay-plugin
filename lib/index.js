var yeepay = require('yeepay');
var llpaycashpay = require('llpaycashpay');
var util = require('./util');
function Plugins(){
	//单例模式,全局共享plugins
	if(Plugins.instance){
		return Plugins.instance;
	}else{
		this.plugins = {};
		return (Plugins.instance = this);
	}
}
//增加插件,name:插件名字,payConfig:支付方式配置
Plugins.prototype.add = function(name,payConfig){
	var payClass;
	//若系统中不存在这个插件实例，且参数名字为字符串，配置为json对象，则加到插件对象中
	if(!this.get(name) && util.isString(name) && util.isObject(payInstance)){
		payClass = this.getPayClass(name);
		if(util.isFunction(payClass)){
			this.plugins[name] = new payClass(payConfig);
		}
	}
	return this;
}
//根据插件名获取插件实例
Plugins.prototype.get = function(name){
	return this.plugins[name];
}
//获取目前系统所有的插件
Plugins.prototype.getAll = function(){
	return {key:Object.keys(this.plugins),plugin:this.plugins};
}
//根据插件名删除插件
Plugins.prototype.delete = function(name){
	delete this.plugins[name];
	return this;
}
//根据名字获取支付的类
Plugins.prototype.getPayClass = function(name){
	var payClass;
	switch(name){
		'yeepay':
			payClass = yeepay;
			break;
		'llpay':
			payClass = wapllpay;
			break;
	}
	return payClass;
}
module.exports = new Plugins();