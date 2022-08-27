echo "
#!/bin/sh
cd $(pwd)
if [ "\$#" -eq 0 ]; then
    ./run.sh
    exit 1
fi
case "\$1" in
  upgrade)
    ./install.sh
    exit 1
    ;;

  edit)
    ./edit_image.sh
    exit 1
    ;;

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
chmod +x $(pwd)/*.sh
chmod +x /usr/local/bin/mtracker
echo "Run 'mtracker launch' to launch mtracker."
