CC := clang
SDK := /Library/Developer/CommandLineTools/SDKs/MacOSX26.5.sdk

CFLAGS := -Wall -Wextra -g -isysroot $(SDK)

SRC ?= mem.c
TARGET := $(basename $(SRC))

.PHONY: all run clean

all: $(TARGET)

$(TARGET): $(SRC)
	$(CC) $(CFLAGS) $(SRC) -o $(TARGET)

run: $(TARGET)
	./$(TARGET)

clean:
	rm -f $(TARGET)
