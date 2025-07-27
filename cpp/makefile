CC=g++
CFLAGS=-g -Wall -Wextra
OBJS=main.cpp
TARGET=a.out
LINKS?=

# run 'make' then first workflow execute 'all'(whatever)
all: $(TARGET) _run _clean

# build ===============
$(TARGET) : $(OBJS) $(LINKS)
	@$(CC) $(CFLAGS) -o $@ $(OBJS) $(LINKS)

# execute
_run:
	@./$(TARGET)
	
# clean by complied
_clean:
	@rm -rf *.out *.out.*

# make main.c into c dir
new:
ifneq ($(wildcard main.cpp),)
	@echo "main.cpp already exists. Aborting."
else
	@touch main.cpp
	@echo "#include <iostream>\n\nint main(int argc, char *argv[]) {\n\tstd::cout << \"Hello World!\" << std::endl;\n\treturn 0; \n}" >> main.cpp
endif

# clean bin by product
clean:
	@rm -rf *.su *.o *.bin.txt