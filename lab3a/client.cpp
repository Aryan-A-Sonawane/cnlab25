#include <iostream>
#include <string.h>

#ifdef _WIN32
    #include <winsock2.h>
    #include <ws2tcpip.h>
    #pragma comment(lib, "ws2_32.lib")
#else
    #include <unistd.h>
    #include <arpa/inet.h>
    #include <sys/socket.h>
    #define closesocket close
#endif

#define PORT 8080

int main() {
#ifdef _WIN32
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
#endif

    int sock = 0;
    struct sockaddr_in serv_addr;
    char buffer[1024] = {0};
    const char* hello = "Hello from Client!";

    sock = socket(AF_INET, SOCK_STREAM, 0);
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(PORT);

#ifdef _WIN32
    serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
#else
    inet_pton(AF_INET, "127.0.0.1", &serv_addr.sin_addr);
#endif

    connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));
    send(sock, hello, strlen(hello), 0);
    std::cout << "Hello message sent" << std::endl;

    recv(sock, buffer, 1024, 0);
    std::cout << "Server: " << buffer << std::endl;

    closesocket(sock);
#ifdef _WIN32
    WSACleanup();
#endif
    return 0;
}
