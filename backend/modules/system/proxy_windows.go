//go:build windows

package system

import (
	"fmt"
	"os/exec"
)

// SetSystemProxy 设置系统代理 (Windows)
func SetSystemProxy(host string, port int) error {
	proxyServer := fmt.Sprintf("%s:%d", host, port)

	// 启用代理
	cmd := exec.Command("reg", "add",
		`HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings`,
		"/v", "ProxyEnable", "/t", "REG_DWORD", "/d", "1", "/f")
	if err := cmd.Run(); err != nil {
		return err
	}

	// 设置代理服务器
	cmd = exec.Command("reg", "add",
		`HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings`,
		"/v", "ProxyServer", "/t", "REG_SZ", "/d", proxyServer, "/f")
	return cmd.Run()
}

// ClearSystemProxy 清除系统代理
func ClearSystemProxy() error {
	cmd := exec.Command("reg", "add",
		`HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings`,
		"/v", "ProxyEnable", "/t", "REG_DWORD", "/d", "0", "/f")
	return cmd.Run()
}

// GetSystemProxyStatus 获取系统代理状态
func GetSystemProxyStatus() (bool, string, int, error) {
	cmd := exec.Command("reg", "query",
		`HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings`,
		"/v", "ProxyEnable")
	output, err := cmd.Output()
	if err != nil {
		return false, "", 0, err
	}

	// 简单检查是否包含 0x1
	enabled := string(output)
	return enabled != "" && (enabled[len(enabled)-2] == '1'), "", 0, nil
}
