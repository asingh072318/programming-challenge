[ -d "/usr/local/bin/mtracker_files" ] && rm -rf /usr/local/bin/mtracker_files
mkdir -m 777 /usr/local/bin/mtracker_files
cp -R $(pwd)/. /usr/local/bin/mtracker_files
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
echo "Run 'mtracker launch' to launch mtracker."
