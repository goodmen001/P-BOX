//go:build darwin

package system

import (
	"fmt"
	"os/exec"
	"strings"
)

// getNetworkServices 获取所有网络服务
func getNetworkServices() ([]string, error) {
	cmd := exec.Command("networksetup", "-listallnetworkservices")
	output, err := cmd.Output()
	if err != nil {
		return nil, err
	}

	lines := strings.Split(string(output), "\n")
	var services []string
	for _, line := range lines {
		line = strings.TrimSpace(line)
		// 跳过第一行说明和空行
		if line == "" || strings.HasPrefix(line, "An asterisk") {
			continue
		}
		services = append(services, line)
	}
	return services, nil
}

// SetSystemProxy 设置系统代理（参考 flyclash 实现）
func SetSystemProxy(host string, port int) error {
	services, err := getNetworkServices()
	if err != nil {
		return fmt.Errorf("failed to get network services: %v", err)
	}

	portStr := fmt.Sprintf("%d", port)
	fmt.Printf("🔧 设置系统代理: %s:%s\n", host, portStr)

	for _, service := range services {
		// 设置 HTTP 代理（会自动启用）
		if err := exec.Command("networksetup", "-setwebproxy", service, host, portStr).Run(); err != nil {
			fmt.Printf("⚠ %s: HTTP 代理设置失败\n", service)
			continue
		}
		fmt.Printf("✓ %s: HTTP 代理已启用\n", service)

		// 设置 HTTPS 代理（会自动启用）
		if err := exec.Command("networksetup", "-setsecurewebproxy", service, host, portStr).Run(); err != nil {
			fmt.Printf("⚠ %s: HTTPS 代理设置失败\n", service)
		} else {
			fmt.Printf("✓ %s: HTTPS 代理已启用\n", service)
		}

		// 设置 SOCKS 代理（会自动启用）
		if err := exec.Command("networksetup", "-setsocksfirewallproxy", service, host, portStr).Run(); err != nil {
			fmt.Printf("⚠ %s: SOCKS 代理设置失败\n", service)
		} else {
			fmt.Printf("✓ %s: SOCKS 代理已启用\n", service)
		}

		// 设置绕过代理的域名（与 flyclash 一致）
		exec.Command("networksetup", "-setproxybypassdomains", service, "localhost", "127.0.0.1", "::1", "*.local").Run()
		fmt.Printf("✓ %s: 绕过域名已设置\n", service)
	}

	fmt.Println("✅ 系统代理设置完成")
	return nil
}

// ClearSystemProxy 清除系统代理
func ClearSystemProxy() error {
	services, err := getNetworkServices()
	if err != nil {
		return fmt.Errorf("failed to get network services: %v", err)
	}

	for _, service := range services {
		exec.Command("networksetup", "-setwebproxystate", service, "off").Run()
		exec.Command("networksetup", "-setsecurewebproxystate", service, "off").Run()
		exec.Command("networksetup", "-setsocksfirewallproxystate", service, "off").Run()
	}

	return nil
}

// GetSystemProxyStatus 获取系统代理状态
func GetSystemProxyStatus() (bool, string, int, error) {
	services, err := getNetworkServices()
	if err != nil || len(services) == 0 {
		return false, "", 0, err
	}

	// 检查第一个服务的代理状态
	service := services[0]
	cmd := exec.Command("networksetup", "-getwebproxy", service)
	output, err := cmd.Output()
	if err != nil {
		return false, "", 0, err
	}

	lines := strings.Split(string(output), "\n")
	var enabled bool
	var host string
	var port int

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if strings.HasPrefix(line, "Enabled:") {
			enabled = strings.Contains(line, "Yes")
		} else if strings.HasPrefix(line, "Server:") {
			host = strings.TrimPrefix(line, "Server: ")
		} else if strings.HasPrefix(line, "Port:") {
			fmt.Sscanf(strings.TrimPrefix(line, "Port: "), "%d", &port)
		}
	}

	return enabled, host, port, nil
}
