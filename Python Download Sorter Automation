import os
import shutil
import time

# Define the directories to watch and the destination folder for "Others."
download_directory = r'C:\Users\Adenr\Downloads'
other_destination = os.path.join(download_directory, 'Others')

# Load the folder names and extensions.
folder_names = {
    "Audio": {'aif', 'cda', 'mid', 'midi', 'mp3', 'mpa', 'ogg', 'wav', 'wma'},
    "Compressed": {'7z', 'deb', 'pkg', 'rar', 'rpm', 'tar.gz', 'z', 'zip'},
    'Code': {'js', 'jsp', 'html', 'ipynb', 'py', 'java', 'css'},
    'Documents': {'ppt', 'pptx', 'pdf', 'xls', 'xlsx', 'doc', 'docx', 'txt', 'tex', 'epub'},
    'Images': {'bmp', 'gif', 'ico', 'jpeg', 'jpg', 'png', 'jfif', 'svg', 'tif', 'tiff'},
    'Softwares': {'apk', 'bat', 'bin', 'exe', 'jar', 'msi', 'py'},
    'Videos': {'3gp', 'avi', 'flv', 'h264', 'mkv', 'mov', 'mp4', 'mpg', 'mpeg', 'wmv'},
}

def organize_file(file_path):
    _, file_extension = os.path.splitext(file_path)
    for folder, extensions in folder_names.items():
        if file_extension[1:] in extensions:
            destination_folder = os.path.join(download_directory, folder)
            if not os.path.exists(destination_folder):
                os.makedirs(destination_folder)
            shutil.move(file_path, os.path.join(destination_folder, os.path.basename(file_path)))
            print(f'Moved {file_path} to {destination_folder}')
            return
    # If the file doesn't match any known extension, move it to 'Others' folder
    if not os.path.exists(other_destination):
        os.makedirs(other_destination)
    shutil.move(file_path, os.path.join(other_destination, os.path.basename(file_path)))
    print(f'Moved {file_path} to {other_destination}')

if __name__ == '__main__':
    while True:
        for root, dirs, files in os.walk(download_directory):
            for file in files:
                file_path = os.path.join(root, file)
                organize_file(file_path)
        time.sleep(60)  # Sleep for a minute before scanning the directory again
