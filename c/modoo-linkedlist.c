#include <stdio.h>
#include <stdlib.h>

// implements Linked list
struct Node {
  int data;
  struct Node *prevNode;
  struct Node *nextNode;
};

struct Node *createNode(int data);
struct Node *insertNode(struct Node *current, int data);
void destroyNode(struct Node *destroy);

int main() {
  struct Node *a = createNode(1);
  struct Node *b = insertNode(a, 2);
  struct Node *c = insertNode(b, 3);
  struct Node *d = insertNode(c, 4);
  struct Node *b_c = insertNode(b, 5);

  printf("a : %p \n", a);
  printf("a prevNode : %p \n", a->prevNode);
  printf("a nextNode : %p \n", a->nextNode);

  printf("b : %p \n", b);
  printf("b prevNode : %p \n", b->prevNode);
  printf("b nextNode : %p \n", b->nextNode);

  printf("b_c : %p \n", b_c);
  printf("b_c prevNode : %p \n", b_c->prevNode);
  printf("b_c nextNode : %p \n", b_c->nextNode);

  printf("c : %p \n", c);
  printf("c prevNode : %p \n", c->prevNode);
  printf("c nextNode : %p \n", c->nextNode);

  printf("d : %p \n", d);
  printf("d prevNode : %p \n", d->prevNode);
  printf("d nextNode : %p \n", d->nextNode);

  destroyNode(a);
  destroyNode(b);
  destroyNode(b_c);
  destroyNode(c);
  destroyNode(d);

  return 0;
}

struct Node *createNode(int data) {
  struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));

  if (newNode == NULL) {
    printf("Memory allocation failed \n");
    exit(1);
  }

  newNode->data = data;
  newNode->prevNode = NULL;
  newNode->nextNode = NULL;

  return newNode;
}

struct Node *insertNode(struct Node *current, int data) {
  struct Node *after = current->nextNode;

  struct Node *newNode = (struct Node *)malloc(sizeof(struct Node));

  if (newNode == NULL) {
    printf("Memory allocation failed \n");
    exit(1);
  }

  newNode->data = data;
  newNode->prevNode = current;
  newNode->nextNode = after;

  if (after != NULL) {
    current->nextNode->prevNode = newNode;
  }

  current->nextNode = newNode;

  return newNode;
}

void destroyNode(struct Node *destroy) {
  if (destroy == NULL) {
    printf("Not exist node");
    exit(1);
  }

  if (destroy->prevNode != NULL) {
    destroy->prevNode->nextNode = destroy->nextNode;
  }

  if (destroy->nextNode != NULL) {
    destroy->nextNode->prevNode = destroy->prevNode;
  }

  free(destroy);
}