#include <stdio.h>
#include <stdlib.h>
struct Lisa {
  int data1;
  double data2;
  struct Lisa* next;
};


int main() {
  struct Lisa a;
  struct Lisa* p;
  printf("p size = %lu\n", sizeof(p));
  p = (struct Lisa*) malloc(sizeof(struct Lisa));
  p -> data1 = 12;
  a.next = p;
  printf("p.data1 = %d\n", a.next->data1);
  printf("data1 = %lu\n", sizeof(a.data1));
  printf("data2 = %lu\n", sizeof(a.data2));
  printf("next = %lu\n", sizeof(a.next));
  printf("a is %lu\n", sizeof(struct Lisa));
  return 0;
}
