#include <iostream>
#include <cstring>

#ifdef _WIN32
    #include <winsock2.h>
    #pragma comment(lib, "ws2_32.lib")
#else
    #include <unistd.h>
    #include <netinet/in.h>
    #include <sys/socket.h>
    #define closesocket close
#endif

#define PORT 8080

int main() {
#ifdef _WIN32
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
#endif

    int server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[1024] = {0};
    const char* hello = "Hello from Server!";

    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    if (server_fd == 0) {
        perror("Socket failed");
#ifdef _WIN32
        WSACleanup();
#endif
        return 1;
    }

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY; // Listen on all interfaces
    address.sin_port = htons(PORT);

    bind(server_fd, (struct sockaddr*)&address, sizeof(address));
    listen(server_fd, 3);

    std::cout << "Server listening on port " << PORT << std::endl;

    new_socket = accept(server_fd, (struct sockaddr*)&address, &addrlen);
    recv(new_socket, buffer, 1024, 0);
    std::cout << "Client: " << buffer << std::endl;

    send(new_socket, hello, strlen(hello), 0);
    std::cout << "Hello message sent" << std::endl;

    closesocket(new_socket);
    closesocket(server_fd);
#ifdef _WIN32
    WSACleanup();
#endif
    return 0;
}
