CC=gcc
CFLAGS=-g -Wall -Wextra
OBJS=main.o
TARGET=a.out

# run 'make' then first workflow execute 'all'(whatever)
all: $(TARGET) _run _clean

# build ===============
$(TARGET) : $(OBJS)
	@$(CC) $(CFLAGS) -o $@ $(OBJS)

# dependencies 안쓰면 파일 변경 여부를 고려하지않음.
# dependencies 안쓰면 빌드 산출물이 존재할때 파일이 변경되더라도 빌드를 하지 않음.
# dependencies 를 쓰면 빌드 산출물 없을때, 파일이 변경되었을때 빌드가 되고, 변경이 없으면 빌드를 건너뜀.
main.o: main.c
	@$(CC) $(CFLAGS) -c -o main.o main.c
# =====================

# execute
_run:
	@./$(TARGET)
	
# clean by complied
_clean:
	@rm -f *.out

# make main.c into c dir
new:
ifneq ($(wildcard main.c),)
	@echo "main.c already exists. Aborting."
else
	@touch main.c
	@echo "#include <stdio.h>\n\nint main(int argc, char *argv[]) {\n\tprintf(\"Hello World! \\\n\");\n\treturn 0; \n}" >> main.c
endif

# binary log of main.o into main_bin.txt
_dump:
	@objdump -d -S -h main.o > main.bin.txt
	@$(CC) -fstack-usage main.c
	
bin: main.o _dump _clean

# clean bin by product
clean:
	@rm -rf *.su *.o *.bin.txt