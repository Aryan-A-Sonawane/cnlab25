#include <stdio.h>
#define MAX 100
#define INF 9999
int graph[MAX][MAX];
int dist[MAX];
int visited[MAX];
void dijkstra(int start, int n)
{
    for (int i = 0; i < n; i++)
    {
        visited[i] = 0;
        dist[i] = INF;
    }
    dist[start] = 0;
    for (int count = 0; count < n - 1; count++)
    {
        int u = -1;
        for (int i = 0; i < n; i++)
        {
            if (!visited[i] && (u == -1 || dist[i] < dist[u]))
            {
                u = i;
            }
        }
        visited[u] = 1;
        for (int v = 0; v < n; v++)
        {
            if (graph[u][v] && !visited[v])
            {
                if (dist[u] + graph[u][v] < dist[v])
                {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }
    }
    printf("distance from %d node ", start);
    for (int i = 0; i < n; i++)
    {
        printf("to %d is %d\n", i, dist[i]);
    }
}
int main()
{
    int n, e, u, v, w, start;
    printf("Enter the number of nodes:\n");
    scanf("%d", &n);
    printf("Enter number of edges\n");
    scanf("%d", &e);
    for (int i = 0; i < n; i++)
    {
        for (int j = 0; j < n; j++)
        {
            graph[i][j] = 0;
        }
    }
    printf("Enter the number of edges and weight (u v w):\n");
    for (int i = 0; i < e; i++)
    {
        scanf("%d %d %d", &u, &v, &w);
        graph[u][v] = w;
        graph[v][u] = w; 
    }
    printf("Enter starting node\n");
    scanf("%d", &start);
    dijkstra(start, n);
}
