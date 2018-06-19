#include <stdio.h>
#include <string.h>
int main() {
	char* a = "哈";
	printf("a = %s\n", a);
	printf("strlen is %lu\n", strlen(a));
	printf("a[0] = %c\n", a[0]);
	printf("a[1] = %c\n", a[1]);
	printf("a[2] = %c\n", a[2]);
	return 0;
}
