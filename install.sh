# Check if mtracker_files directory exists and delete it
[ -d "/usr/local/bin/mtracker_files" ] && rm -rf /usr/local/bin/mtracker_files
# Create mtracker_files directory
mkdir -m 777 /usr/local/bin/mtracker_files
# Copy source code to mtracker_files
cp -R $(pwd)/. /usr/local/bin/mtracker_files
# creates mtracker executable in /usr/local/bin
echo "
#!/bin/sh
cd /usr/local/bin/mtracker_files
if [ "\$#" -eq 0 ]; then
    ./run.sh

    exit 1
fi
case "\$1" in
  build)
    ./build_image.sh
    exit 1
    ;;

  launch)
    ./run.sh
    exit 1
    ;;

  *)
    echo 'Unknown Command'
    exit 1
    ;;
esac
" > /usr/local/bin/mtracker;
chmod +x /usr/local/bin/mtracker_files/*.sh
chmod +x /usr/local/bin/mtracker
echo "Run 'mtracker' to launch mtracker."
