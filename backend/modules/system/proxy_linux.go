//go:build linux

package system

import "fmt"

// SetSystemProxy 设置系统代理 (Linux 通常使用 TUN 模式)
func SetSystemProxy(host string, port int) error {
	// Linux 桌面环境多样，通常建议使用 TUN 模式
	// 这里只是占位，不实际设置
	return nil
}

// ClearSystemProxy 清除系统代理
func ClearSystemProxy() error {
	return nil
}

// GetSystemProxyStatus 获取系统代理状态
func GetSystemProxyStatus() (bool, string, int, error) {
	return false, "", 0, fmt.Errorf("not supported on Linux, use TUN mode instead")
}
