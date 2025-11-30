#include <iostream>
#include <fstream>
#include <cstring>

#ifdef _WIN32
    #include <winsock2.h>
    #pragma comment(lib, "ws2_32.lib")
#else
    #include <unistd.h>
    #include <sys/socket.h>
    #include <netinet/in.h>
    #include <arpa/inet.h>
    #define closesocket close
#endif

#define PORT 9090

int main() {
#ifdef _WIN32
    WSADATA wsaData;
    WSAStartup(MAKEWORD(2, 2), &wsaData);
#endif

    int server_fd, new_socket;
    struct sockaddr_in address;
    int addrlen = sizeof(address);
    char buffer[1024];

    server_fd = socket(AF_INET, SOCK_STREAM, 0);

    address.sin_family = AF_INET;
    address.sin_addr.s_addr = INADDR_ANY;
    address.sin_port = htons(PORT);

    bind(server_fd, (struct sockaddr*)&address, sizeof(address));
    listen(server_fd, 3);
    std::cout << "Waiting for file request on port " << PORT << std::endl;

    new_socket = accept(server_fd, (struct sockaddr*)&address, &addrlen);

    // Receive requested filename
    recv(new_socket, buffer, 1024, 0);
    buffer[1024-1] = '\0';
    std::string filename = buffer;
    std::ifstream file(filename, std::ios::binary);

    if (!file) {
        std::cerr << "File not found: " << filename << std::endl;
        closesocket(new_socket);
        closesocket(server_fd);
#ifdef _WIN32
        WSACleanup();
#endif
        return 1;
    }

    while (!file.eof()) {
        file.read(buffer, sizeof(buffer));
        send(new_socket, buffer, file.gcount(), 0);
    }

    std::cout << "File sent successfully.\n";
    file.close();
    closesocket(new_socket);
    closesocket(server_fd);
#ifdef _WIN32
    WSACleanup();
#endif
    return 0;
}
