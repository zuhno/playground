#include <stdio.h>
#include <sys/wait.h>
#include <unistd.h>

int main(int argc, char **argv) {
  pid_t pid, pid1;

  // fork() returns the child process ID if the process is the parent process
  // or 0 if not.
  pid = fork();

  if (pid > 0) { // parent process
    wait(NULL);
    pid1 = getpid();
    printf("parent pid: %d\n", pid);   // child process id
    printf("parent pid1: %d\n", pid1); // current process id
  } else if (pid == 0) {               // child process
    pid1 = getpid();
    printf("child pid: %d\n", pid);   // 0 (because it's child process)
    printf("child pid1: %d\n", pid1); // current process id(child process id)
  }

  return 0;
}
